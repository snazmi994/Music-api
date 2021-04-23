# sh curl-scripts/create.sh
curl 'https://still-waters-28437.herokuapp.com/music' \
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
