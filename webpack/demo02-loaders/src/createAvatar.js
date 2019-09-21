import avatar from './avatar.jpg'

export default function createAvatar() {
  const img = new Image()
  img.src = avatar
  img.classList.add('avatar')

  const root = document.getElementById('root')
  root.appendChild(img)
}