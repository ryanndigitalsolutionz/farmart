import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('farmart-theme')

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
      ? 'dark'
      : 'light'
  })

  const isDark = theme === 'dark'

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'dark' ? 'light' : 'dark',
    )
  }

  const changeTheme = (newTheme) => {
    if (newTheme !== 'light' && newTheme !== 'dark') {
      return
    }

    setTheme(newTheme)
  }

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme,
    )

    document.documentElement.classList.toggle(
      'dark',
      isDark,
    )

    localStorage.setItem(
      'farmart-theme',
      theme,
    )
  }, [theme, isDark])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        toggleTheme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error(
      'useTheme must be used inside ThemeProvider',
    )
  }

  return context
}

export default ThemeContext
// commit 37
