data "aws_route53_zone" "domain_zone" {
  name = var.hosted_zone_name
}

resource "aws_amplify_domain_association" "domain_association" {
  app_id                = aws_amplify_app.marcnewman_me_amplify_app.id
  domain_name           = var.domain_name
  wait_for_verification = false

  sub_domain {
    prefix      = ""
    branch_name = aws_amplify_branch.main_branch.branch_name
  }

  sub_domain {
    prefix      = "www"
    branch_name = aws_amplify_branch.main_branch.branch_name
  }

  lifecycle {
    ignore_changes = [certificate_settings]
  }
}
