const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((doc) => doc.populate(['owner', 'likes']))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным id не найдена'));
      }
      if (req.user._id === card.owner.toString()) {
        return card.delete()
          .then(() => res.send({ message: 'Карточка удалена' }));
      }
      return next(new ForbiddenError('Вы можете удалить только свою карточку'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Удаление карточки с некорректным id'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id },
  }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Передан несуществующий id карточки'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Добавление лайка с некорректным id карточки'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.user._id },
  }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Передан несуществующий id карточки'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Удаление лайка с некорректным id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
