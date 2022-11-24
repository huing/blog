```js
React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;
          return React.cloneElement(child, {
            ...child.props,
            onClick: () => {},
          });
        })
        ```
