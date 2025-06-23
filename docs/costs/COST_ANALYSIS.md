# GreenForked – Deployment Cost Analysis

## Current MVP Deployment (Hetzner Cloud, Self-Hosted, June 2024 Pricing)

| Service                | Plan/Usage                        | Monthly Cost (USD) |
|------------------------|-----------------------------------|--------------------|
| Hetzner CPX31          | 1 node, 4 vCPU, 8GB RAM, 160GB SSD | ~$12.50           |
| PostgreSQL             | Self-hosted                       | $0                 |
| Cloudflare Images      | Free tier                         | $0                 |
| Nutritionix API        | Free tier                         | $0                 |
| SSL                    | Let's Encrypt                     | $0                 |
| **Total**              |                                   | **~$12.50**        |

- **Domain name already owned** (not included in monthly cost)
- All services (frontend, backend, database) run on a single Hetzner CPX31 node
- Cloudflare Images and Nutritionix API free tiers are sufficient for early-stage use
- [Hetzner Cloud Pricing Reference](https://www.hetzner.com/cloud)

**We will go ahead with the Hetzner CPX31 plan for ~$12.50/month.**

---

## Alternative: Linode 4GB + 2GB (Original Plan)

| Service                | Plan/Usage                        | Monthly Cost (USD) |
|------------------------|-----------------------------------|--------------------|
| Linode 4GB + 2GB       | 1x 4GB, 1x 2GB Shared CPU         | $36                |
| PostgreSQL             | Self-hosted (on one node)         | $0                 |
| Cloudflare Images      | Free tier                         | $0                 |
| Nutritionix API        | Free tier                         | $0                 |
| SSL                    | Let's Encrypt                     | $0                 |
| **Total**              |                                   | **$36**            |

- Fallback option if Hetzner setup proves challenging

---

## Alternative: 2x 4GB or 1x 8GB Linode Nodes

| Service                | Plan/Usage                        | Monthly Cost (USD) |
|------------------------|-----------------------------------|--------------------|
| Linode 4GB x2          | 2 nodes, 4GB RAM each             | $48                |
| Linode 8GB             | 1 node, 8GB RAM                   | $48                |
| PostgreSQL             | Self-hosted (on one node)         | $0                 |
| Cloudflare Images      | Free tier                         | $0                 |
| Nutritionix API        | Free tier                         | $0                 |
| SSL                    | Let's Encrypt                     | $0                 |
| **Total**              |                                   | **$48**            |

- Upgrade to these options if more resources are needed

---

## Future Scaling Options

As usage grows, you may need to scale up resources or move to managed services for reliability and ease of maintenance. Example upgrade paths:

| Service                | Plan/Usage                        | Monthly Cost (USD) |
|------------------------|-----------------------------------|--------------------|
| Linode 8GB x2          | 2 nodes, 8GB RAM each             | $96                |
| Managed PostgreSQL     | Linode Managed DB, 4GB RAM, 80GB  | $63                |
| Cloudflare Images      | Paid tier (100GB, 100k images)    | $5                 |
| Nutritionix API        | 50,000 requests/month             | $29                |
| SSL                    | Let's Encrypt                     | $0                 |
| **Total**              |                                   | **$134**           |

- Upgrade Linode resources as traffic and data grow
- Move PostgreSQL to a managed service for backups, failover, and scaling
- Upgrade Cloudflare Images and Nutritionix API as usage exceeds free tier
- Consider load balancers, backups, and monitoring for production

---

## Notes
- All prices as of June 2024, subject to change
- Actual costs may vary with usage, provider, and region
- This analysis assumes self-managed infrastructure for cost efficiency in early stages
- See [Linode Pricing](https://www.linode.com/pricing/) for the latest details

---

## Provider Comparison: Compute & RAM Value (June 2024)

| Provider         | vCPU | RAM  | SSD Storage | Transfer | Price (USD/mo) | Notes                        |
|------------------|------|------|-------------|----------|----------------|------------------------------|
| **Hetzner CPX31**| 4    | 8GB  | 160GB       | 20TB     | ~$12.50        | Our chosen plan, best value  |
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