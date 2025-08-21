#!/bin/bash

echo "🔧 Updating Render environment variables for Real Estate Strapi..."

# Render API configuration
RENDER_API_TOKEN="rnd_a36FMTbiOJ3pJvccRvQlnIgCHSJG"
SERVICE_ID="srv-d2jgfr0gjchc73cuvi00"

# Environment variables to set
ENV_VARS=(
  "HOST=0.0.0.0"
  "PORT=10000"
  "NODE_ENV=production"
  "DATABASE_CLIENT=postgres"
  "DATABASE_HOST=dpg-d2j1d3mmcj7s73eh3efg-a"
  "DATABASE_PORT=5432"
  "DATABASE_NAME=cryptomevbot_db"
  "DATABASE_USERNAME=cryptomevbot_db_user"
  "DATABASE_PASSWORD=tLKkIbPnwa7NbhLkUbal6SogrseP9y8H"
  "DATABASE_SSL=false"
  "DATABASE_URL=postgresql://cryptomevbot_db_user:tLKkIbPnwa7NbhLkUbal6SogrseP9y8H@dpg-d2j1d3mmcj7s73eh3efg-a:5432/cryptomevbot_db"
  "APP_KEYS=SDwcRBwN1qvI12pLOIFhCw==,3unClrAexz8I0/wInk+tkw==,AN3HgMYaSSwNO3V8Uum6bg==,ibOKs+hwBTtXF/tEFHKVVQ=="
  "API_TOKEN_SALT=lKWmULfolfTo8gnZgxpnVQ=="
  "ADMIN_JWT_SECRET=8d5PHBOVaWCut+T59mSfNQ=="
  "TRANSFER_TOKEN_SALT=t1EGfeeC/RLD7zLbVjaVzg=="
  "ENCRYPTION_KEY=eKg/GchXUcDIxgapwbHRnQ=="
)

echo "📋 Setting environment variables..."

# Create JSON payload for environment variables
ENV_JSON='['
FIRST=true
for VAR in "${ENV_VARS[@]}"; do
  KEY="${VAR%%=*}"
  VALUE="${VAR#*=}"
  
  if [ "$FIRST" = true ]; then
    FIRST=false
  else
    ENV_JSON+=','
  fi
  
  ENV_JSON+="{\"key\":\"$KEY\",\"value\":\"$VALUE\"}"
done
ENV_JSON+=']'

# Update service environment variables
echo "🚀 Updating service environment variables..."
curl -X PATCH "https://api.render.com/v1/services/$SERVICE_ID/env-vars" \
  -H "Authorization: Bearer $RENDER_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$ENV_JSON"

echo ""
echo "✅ Environment variables updated"

# Trigger a new deployment
echo ""
echo "🚀 Triggering new deployment..."
curl -X POST "https://api.render.com/v1/services/$SERVICE_ID/deploys" \
  -H "Authorization: Bearer $RENDER_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"clearCache": true}'

echo ""
echo "✅ Deployment triggered"
echo "📍 Monitor at: https://dashboard.render.com/web/$SERVICE_ID"
echo "🌐 Service URL: https://realestateabroad-cms.onrender.com"