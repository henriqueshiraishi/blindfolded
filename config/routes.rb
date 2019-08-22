Rails.application.routes.draw do
  root 'dashboard#index'
  devise_for :user, controllers: { registrations: 'users/registrations' }
  namespace :users do
    resources :resources, only: [:edit, :update]
  end
end
