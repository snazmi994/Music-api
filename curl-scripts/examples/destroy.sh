#!/bin/bash

API="https://still-waters-28437.herokuapp.com"
URL_PATH="/examples"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
