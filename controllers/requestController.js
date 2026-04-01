import { createRequest } from '../models/requestModel.js'

// SHOW form
export function showRequestForm(req, res) {
  res.render('requests/new', {
    title: 'New Request'
  })
}

// HANDLE form submission
export async function submitRequest(req, res) {
  try {
    const { title, description } = req.body

    //comes from session login
    const user_id = req.session.user.id

    await createRequest(user_id, title, description)

    res.redirect('/dashboard')

  } catch (error) {
    console.error("submitRequest error:", error)
    res.status(500).send("Server Error")
  }
}