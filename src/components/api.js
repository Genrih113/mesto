export class Api {
  constructor() {

  }

  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
      headers: {
        authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304'
      }
      })
      .then(res => res.json())
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
      headers: {
        authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304'
      }
      })
      .then(res => res.json())
  }

  editUserInfo(inputsInfoObject) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputsInfoObject.popupInputName,
        about: inputsInfoObject.popupInputPassion
      })
      })
      .then((res) => res.json())
  }

  addNewCard(inputsInfoObject) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
        method: 'POST',
        headers: {
          authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: inputsInfoObject.popupInputPlace,
          link: inputsInfoObject.popupInputLink
        })
        })
        .then((res) => res.json())
  }

  deleteCard(cardId) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards/' + cardId, {
        method: 'DELETE',
        headers: {
          authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
          'Content-Type': 'application/json'
        }
        })
        .then((res) => res.json())
  }

  likeToggleCard(doILikedCard, imageId) {
    if (!doILikedCard) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/' + imageId, {
      method: 'PUT',
      headers: {
        authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
        'Content-Type': 'application/json'
      }
      })
      .then((res) => res.json())
      } else {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/' + imageId, {
      method: 'DELETE',
      headers: {
        authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
        'Content-Type': 'application/json'
      }
      })
      .then((res) => res.json())
      }
  }

  changeAvatar(url) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '7d3b332b-dc1e-49e3-90aa-8e33833ea304',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url.popupInputAvatarLink
      })
      })
      .then((res) => res.json())
  }
}
