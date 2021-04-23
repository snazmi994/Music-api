curl "https://still-waters-28437.herokuapp.com/music/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "music": {
      "title": "'"${TITLE}"'",
      "artist": "'"${ARTIST}"'",
      "fav_song": "'"${SONG}"'"
    }
  }'
