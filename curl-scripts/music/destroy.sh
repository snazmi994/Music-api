curl "http://localhost:4741/music/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"
