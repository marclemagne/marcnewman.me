variable "domain_name" {
  description = "The fully qualified domain name (FQDN) to associate with the Amplify app in Route 53."
  type        = string
}

variable "hosted_zone_name" {
  description = "The name of the Route 53 hosted zone managing the DNS records for the domain."
  type        = string
}

variable "access_token_secret_arn" {
  description = "The ARN of the AWS Secrets Manager secret storing the GitHub personal access token for authentication."
  type        = string
}

variable "region" {
  default     = "us-east-1"
  description = "The AWS region where resources will be deployed."
  type        = string
}

variable "repository" {
  description = "The Git repository URL used by the Amplify app."
  type        = string
}
