
curl 'http://localhost:4741/music' \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
