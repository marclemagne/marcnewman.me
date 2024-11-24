terraform {
  required_version = ">= 1.9.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.76.0"
    }
  }
}

provider "aws" {
  region = var.region
}

# ============
# SERVICE ROLE
# ============

# resource "aws_iam_role" "amplify_role" {
#   name = "amplify_deploy_terraform_role"
#
#   assume_role_policy = jsonencode({
#     "Version" : "2012-10-17",
#     "Statement" : [
#       {
#         "Effect" : "Allow",
#         "Principal" : {
#           "Service" : "amplify.amazonaws.com"
#         },
#         "Action" : "sts:AssumeRole"
#       }
#     ]
#   })
# }
#
# resource "aws_iam_role_policy_attachment" "amplify_role_policy" {
#   role       = aws_iam_role.amplify_role.name
#   policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess-Amplify"
# }

# ===========
# AMPLIFY APP
# ===========

data "aws_secretsmanager_secret_version" "access_token" {
  secret_id = var.access_token_secret_arn
}

resource "aws_amplify_app" "marcnewman_me_amplify_app" {
  name = var.domain_name

  repository   = var.repository
  access_token = data.aws_secretsmanager_secret_version.access_token.secret_string

  enable_branch_auto_build = true

  # iam_service_role_arn = aws_iam_role.amplify_role.arn

  build_spec = <<-EOT
    version: 0.1
    frontend:
      phases:
        preBuild:
          commands:
            - npm install
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  environment_variables = {
    NODE_ENV = "production"
  }
}

resource "aws_amplify_branch" "main_branch" {
  app_id      = aws_amplify_app.marcnewman_me_amplify_app.id
  branch_name = "main"
}
