# ChatApplication

4th Commit: Improved Login Backend Handeling.
(Learning: give status codes appropriatly) - error was coming due to using both res.sendStatus with return keyword.


5th Commit: we should not set status on response in authentication stages (headers can be set only once - read about res.write)
(Problem now: Still id & password property of founduser in login controller user.ts is not obtained by typescript
& why next() at line 15 is not working in authenticate.ts middleware)


7th commit:
 User.belongsToMany(Users, {
      through: models.Following,
      as: 'Follower',
      foreignKey: 'following_id',
    });
remember here Users is called alias and never define same alias in two models, it will throw error during association.