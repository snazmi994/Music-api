# sh curl-scripts/create.sh
curl 'http://localhost:4741/music' \
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
