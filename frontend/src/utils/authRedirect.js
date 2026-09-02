export function getPostLoginRedirect(user) {
  if (!user || !user.role) return "/login"

  const role = user.role

  if (role === "farmer") {
    const farmProfile =
      typeof window !== "undefined"
        ? localStorage.getItem("farmart_farmProfile")
        : null
    const hasFarmProfile =
      farmProfile &&
      (() => {
        try {
          const parsed = JSON.parse(farmProfile)
          return parsed && parsed.farmName && parsed.location
        } catch {
          return false
        }
      })()

    if (!hasFarmProfile) return "/farm-setup"

    return "/farmer/dashboard"
  }

  if (role === "buyer") {
    return "/buyer/marketplace"
  }

  if (role === "admin") {
    return "/admin/dashboard"
  }

  return "/"
}
