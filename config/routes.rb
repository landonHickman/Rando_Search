Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :topics do
      resources :pages do
        resources :sections
      end
    end
    get '/tests', to: 'tests#index'
    post '/images/upload', to: 'images#upload_1_image'
    get '/images', to: 'images#index'
  end
end
