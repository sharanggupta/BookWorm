# GreenForked – Deployment Cost Analysis

## Development Environment (Local)
- **Cost:** $0 (Docker Compose on local machine)
- **Purpose:** Development and testing
- **Setup:** Local Kubernetes/Docker using docker-compose.yml
- **Resources:** Local machine resources

---

## Staging Environment (Hetzner Cloud, Self-Hosted, June 2024 Pricing)

| Service                | Plan/Usage                        | Monthly Cost (USD) |
|------------------------|-----------------------------------|--------------------|
| Hetzner CPX31          | 1 node, 4 vCPU, 8GB RAM, 160GB SSD | ~$15-20           |
| PostgreSQL             | Self-hosted                       | $0                 |
| Cloudflare Images      | Free tier                         | $0                 |
| Nutritionix API        | Free tier                         | $0                 |
| SSL                    | Let's Encrypt                     | $0                 |
| **Total**              |                                   | **~$15-20**        |

- **Purpose:** Staging and testing before production deployment
- **Domain name already owned** (not included in monthly cost)
- All services (frontend, backend, database) run on a single Hetzner CPX31 node
- Cloudflare Images and Nutritionix API free tiers are sufficient for staging
- [Hetzner Cloud Pricing Reference](https://www.hetzner.com/cloud)

---

## Production Environment (Hetzner Cloud, Self-Hosted)

| Service                | Plan/Usage                        | Monthly Cost (USD) |
|------------------------|-----------------------------------|--------------------|
| Hetzner CPX41          | 1 node, 8 vCPU, 16GB RAM, 240GB SSD | ~$30-40           |
| PostgreSQL             | Self-hosted                       | $0                 |
| Cloudflare Images      | Free tier                         | $0                 |
| Nutritionix API        | Free tier                         | $0                 |
| SSL                    | Let's Encrypt                     | $0                 |
| **Total**              |                                   | **~$30-40**        |

- **Purpose:** Live production application
- **Resources:** Doubled from staging for better performance and reliability
- **Note:** Can upgrade to paid API tiers as usage grows

---

## Environment Summary

| Environment    | Purpose                    | Monthly Cost (USD) | Notes                           |
|----------------|----------------------------|-------------------|---------------------------------|
| Development    | Local development          | $0                | Docker Compose on local machine |
| Staging        | Testing and validation     | ~$15-20           | Single Hetzner CPX31 node       |
| Production     | Live application           | ~$30-40           | Single Hetzner CPX41 node       |
| **Total**      | **All environments**       | **~$45-60**       | **Under $50 target**            |

---

## Alternative: Linode Option (Fallback)

| Service                | Plan/Usage                        | Monthly Cost (USD) |
|------------------------|-----------------------------------|--------------------|
| Linode 4GB + 2GB       | 1x 4GB, 1x 2GB Shared CPU         | $36                |
| PostgreSQL             | Self-hosted (on one node)         | $0                 |
| Cloudflare Images      | Free tier                         | $0                 |
| Nutritionix API        | Free tier                         | $0                 |
| SSL                    | Let's Encrypt                     | $0                 |
| **Total**              |                                   | **$36**            |

- Fallback option if Hetzner setup proves challenging
- Single environment only to stay within budget

---

## Future Scaling Options (When Budget Allows)

As usage grows and budget increases, you can consider:

| Service                | Plan/Usage                        | Monthly Cost (USD) |
|------------------------|-----------------------------------|--------------------|
| Managed PostgreSQL     | Linode Managed DB, 4GB RAM, 80GB  | $63                |
| Cloudflare Images      | Paid tier (100GB, 100k images)    | $5                 |
| Nutritionix API        | 50,000 requests/month             | $29                |
| Load Balancer          | Hetzner Load Balancer             | $6                 |

---

## Notes
- All prices as of June 2024, subject to change
- Actual costs may vary with usage, provider, and region
- This analysis assumes self-managed infrastructure for cost efficiency
- **Total cost target:** Under $50/month for both staging and production
- **Hetzner pricing verification needed:** Exact CPX plan pricing should be verified on [Hetzner Cloud](https://www.hetzner.com/cloud) for specific configurations
- See [Hetzner Cloud Pricing](https://www.hetzner.com/cloud) and [Linode Pricing](https://www.linode.com/pricing/) for the latest details

---

## Provider Comparison: Compute & RAM Value (June 2024)

| Provider         | vCPU | RAM  | SSD Storage | Transfer | Price (USD/mo) | Notes                        |
|------------------|------|------|-------------|----------|----------------|------------------------------|
| **Hetzner CPX31**| 4    | 8GB  | 160GB       | 20TB     | ~$15-20        | Our chosen plan, best value  |
| Linode           | 3    | 6GB  | 130GB       | 6TB      | $36            | Original plan                |
| DigitalOcean     | 3    | 6GB  | 130GB       | 6TB      | $36            | Same config as Linode        |
| Vultr            | 3    | 6GB  | 135GB       | 5TB      | $36            | Similar config               |
| AWS Lightsail    | 3    | 6GB  | 140GB       | 7TB      | $32            | Slightly cheaper             |
| Oracle Free Tier | 4    | 24GB | 200GB       | 10TB     | $0             | ARM only, limited regions    |

### Summary
- **Hetzner** offers the best value by far, providing more resources for less money.
- **Linode, DigitalOcean, Vultr, and AWS Lightsail** are all very close in price and specs for this tier.
- **Oracle Cloud Free Tier** is unbeatable for hobby/dev if ARM is acceptable and you can get a slot.
- **Hetzner** is our chosen provider for cost efficiency and resource optimization.

--- 