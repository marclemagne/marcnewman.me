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

data "aws_secretsmanager_secret" "access_token" {
  name = var.access_token_secret_name
}

data "aws_secretsmanager_secret_version" "access_token" {
  secret_id = data.aws_secretsmanager_secret.access_token.id
}

resource "aws_amplify_app" "marcnewman_me_amplify_app" {
  name = "terraform-${var.domain_name}"

  repository   = var.repository
  access_token = data.aws_secretsmanager_secret_version.access_token.secret_string

  enable_branch_auto_build = true
  iam_service_role_arn     = aws_iam_role.amplify_aws_service_role.arn
  platform                 = "WEB"

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - node -v
            - npm -v
            - npm ci --cache .npm --prefer-offline
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - .next/cache/**/*
          - .npm/**/*
  EOT

  custom_rule {
    source = "https://${var.domain_name}"
    target = "https://www.${var.domain_name}"
    status = "301"
  }

  custom_rule {
    source = "https://www.${var.domain_name}/"
    target = "https://www.${var.domain_name}"
    status = "301"
  }

  custom_rule {
    source = "/me/"
    target = "/me"
    status = "301"
  }

  custom_rule {
    source = "/me"
    target = "/index.html"
    status = "200"
  }

  custom_rule {
    source = "</^(?!/$|/me$)/.*>"
    target = "/"
    status = "301"
  }

  custom_rule {
    source = "/"
    target = "/index.html"
    status = "200"
  }
}

resource "aws_amplify_branch" "main_branch" {
  app_id      = aws_amplify_app.marcnewman_me_amplify_app.id
  branch_name = "main"
}
