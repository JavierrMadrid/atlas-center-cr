function PageShell({ className = '', children }) {
  const classes = ['page-shell', className].filter(Boolean).join(' ')

  return <div className={classes}>{children}</div>
}

export default PageShell