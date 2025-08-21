#!/bin/bash

# Render deployment configuration
RENDER_API_TOKEN="rnd_a36FMTbiOJ3pJvccRvQlnIgCHSJG"
SERVICE_ID="srv-d2it50ali9vc73baq3a0"
DATABASE_ID="dpg-d2j1d3mmcj7s73eh3efg-a"

echo "🚀 Deploying RealEstateAbroad CMS to Render..."

# First, let's create a separate service for our CMS
echo "📦 Creating new service on existing server..."

# Create new service configuration
cat > service-config.json << EOF
{
  "type": "web_service",
  "name": "realestateabroad-cms",
  "ownerId": "usr-cjkl9wh5a0003zyz0h4a3k8c2",
  "repo": "https://github.com/your-repo/realestateabroad-cms.git",
  "branch": "main",
  "runtime": "node",
  "buildCommand": "npm install && npm run build",
  "startCommand": "npm run start",
  "plan": "starter",
  "region": "oregon",
  "envVars": [
    {
      "key": "HOST",
      "value": "0.0.0.0"
    },
    {
      "key": "PORT", 
      "value": "1339"
    },
    {
      "key": "NODE_ENV",
      "value": "production"
    },
    {
      "key": "DATABASE_CLIENT",
      "value": "postgres"
    },
    {
      "key": "DATABASE_HOST",
      "value": "dpg-d2j1d3mmcj7s73eh3efg-a.oregon-postgres.render.com"
    },
    {
      "key": "DATABASE_PORT",
      "value": "5432"
    },
    {
      "key": "DATABASE_NAME",
      "value": "realestateabroad_cms"
    },
    {
      "key": "DATABASE_USERNAME",
      "value": "realestateabroad_cms_user"
    },
    {
      "key": "DATABASE_SSL",
      "value": "true"
    },
    {
      "key": "APP_KEYS",
      "value": "SDwcRBwN1qvI12pLOIFhCw==,3unClrAexz8I0/wInk+tkw==,AN3HgMYaSSwNO3V8Uum6bg==,ibOKs+hwBTtXF/tEFHKVVQ=="
    },
    {
      "key": "API_TOKEN_SALT",
      "value": "lKWmULfolfTo8gnZgxpnVQ=="
    },
    {
      "key": "ADMIN_JWT_SECRET",
      "value": "8d5PHBOVaWCut+T59mSfNQ=="
    },
    {
      "key": "TRANSFER_TOKEN_SALT",
      "value": "t1EGfeeC/RLD7zLbVjaVzg=="
    },
    {
      "key": "ENCRYPTION_KEY",
      "value": "eKg/GchXUcDIxgapwbHRnQ=="
    }
  ]
}
EOF

echo "✅ Service configuration created"
echo "🔧 Please manually create the service in Render dashboard or use the API"
echo "📍 Service will run on port 1339 to avoid conflict with existing instance"
echo "🗄️  Database: dpg-d2j1d3mmcj7s73eh3efg-a (PostgreSQL)"
echo "🎯 Ready for deployment!"