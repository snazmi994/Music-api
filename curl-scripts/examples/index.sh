#!/bin/sh

API="https://still-waters-28437.herokuapp.com"
URL_PATH="/examples"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
