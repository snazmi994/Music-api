API="http://localhost:4741"
URL_PATH="/music"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "music": {
      "title": "'"${TITLE}"'",
      "artist": "'"${ARTIST}"'",
      "fav_song": "'"${SONG}"'"
    }
  }'
