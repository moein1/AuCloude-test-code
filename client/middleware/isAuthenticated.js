export default function ({ store, redirect }) {
  if (!store.state.auth.loggedIn && process.env.NODE_ENV === 'production') {
    return redirect('/signin')
  }
}
