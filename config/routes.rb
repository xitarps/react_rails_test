Rails.application.routes.draw do
  root 'games#index'

  namespace :api do
    namespace :v1 do
      get 'games/index'
      post 'games/create'
      delete 'games/:id', to: 'games#destroy'
    end
  end
end
