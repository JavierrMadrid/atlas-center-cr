function PageShell({ className = '', children }) {
  const classes = ['page-shell', className].filter(Boolean).join(' ')

  return <main className={classes}>{children}</main>
}

export default PageShell