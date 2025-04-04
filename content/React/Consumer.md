---
title: "Consumer"
date: 2022-09-04T12:35:59+08:00
draft: false
categories: ["ts", "react", "css", "js"]
---

```js
export const themes = {
  light: {
    color: "#000000",
    background: "#eeeeee",
  },
  dark: {
    color: "#ffffff",
    background: "#222222",
  },
};

export const ThemeContext = createContext({
  theme: themes.dark,
  toggleTheme: () => {
    //
  },
});

const Button = () => {
  // 消费 consumers
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          onClick={toggleTheme}
          style={{
            background: theme.background,
            color: theme.color,
            width: 100,
            height: 60,
          }}
        >
          click
        </button>
      )}
    </ThemeContext.Consumer>
  );
};

const ThemedButton = () => {
  return <Button />;
};

const App = () => {
  const [theme, setTheme] = useState(themes.dark);
  const toggleTheme = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemedButton />
    </ThemeContext.Provider>
  );
};
export default App;
```
