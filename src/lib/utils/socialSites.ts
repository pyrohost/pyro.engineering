type Social = {
  [key: string]: string;
}

export default function socialSites(socials: Social) {
  const sites = []
  for (const [key, value] of Object.entries(socials)) {
    if (value) {
      sites.push({
        name: key,
// fix github icon at some point 
        icon: key !== 'website' ? `simple-icons:${key}` : `lucide:globe`, 
        link: value,
      })
    }
  }
  console.log(sites)
  return sites
}
