API="https://still-waters-28437.herokuapp.com"
URL_PATH="/music"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
