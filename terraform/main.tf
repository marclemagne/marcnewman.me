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
