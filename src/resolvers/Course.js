const Course = {
  captures: {
    fragment: 'fragment captures on Course { id }',
    resolve(parent, args, ctx, info) {
      if (!parent.captures || parent.captures.length === 0)
        return parent.captures

      const compare = (a, b) => {
        if (a.order < b.order) {
          return -1
        }
        if (a.order > b.order) {
          return 1
        }
        return 0
      }

      return [...parent.captures.sort(compare)]
    }
  }
}

export { Course as default }