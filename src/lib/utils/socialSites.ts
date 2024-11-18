type Social = {
  [key: string]: string;
}

export default function socialSites(socials: Social): { name: string; icon: string; link: string; }[] {
  const sites = []
  if (!socials) return []
  for (let [key, value] of Object.entries(socials)) {
    if (key === "mastodon") value = value.replace(/(?<user>@[a-zA-Z0-9]*)(?<server>@[\w\W]*)/, "https://$2/$1")
    if (value) {
      sites.push({
        name: key,
        icon: key !== 'website' ? `simple-icons:${key}` : `lucide:globe`, 
        link: value,
      })
    }
  }
  return sites
}
