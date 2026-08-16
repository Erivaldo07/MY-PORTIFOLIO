// utils/projectImage.ts

/**
 * Gera a URL de uma screenshot automática do site do projeto.
 * Se o projeto já tiver uma imagem manual definida (`project.image`),
 * essa é sempre priorizada — o auto-screenshot é só o fallback.
 */
export function getProjectImageUrl(project: {
  image?: string
  liveUrl?: string
}): string | null {
  if (project.image) return project.image

  if (project.liveUrl) {
    // Microlink: gera um screenshot real da página, cacheado
    const params = new URLSearchParams({
      url: project.liveUrl,
      screenshot: 'true',
      meta: 'false',
      embed: 'screenshot.url',
      colorScheme: 'dark', // opcional: combina com seu tema
      viewport: JSON.stringify({ width: 1280, height: 800 }),
    })

    return `https://api.microlink.io/?${params.toString()}`
  }

  return null
}
