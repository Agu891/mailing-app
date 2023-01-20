provider "aws"  {
    region = "THE_REGION_WHERE_YOU_HAVE_YOUR_ACCOUNT"
    access_key = "YOUR_ACCESS_KEY"
    secret_key = "YOUR_SECRET_ACCESS_KEY"
}


 // Create a DynamoTable

resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "Emails"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "email_status"
  range_key      = "email_date"

  attribute {
    name = "email_status"
    type = "S"
  }

  attribute {
    name = "email_date"
    type = "S"
  }

  ttl {
    attribute_name = "TimeToExist"
    enabled        = false
  }



  tags = {
    Name        = "dynamodb-table-1"
    Environment = "production"
  }
}
