Rails.application.routes.draw do
  root 'dashboard#index'
  devise_for :user, controllers: { registrations: 'users/registrations' }
  namespace :class_diagram do
    resources :diagramas
    resources :classes, except: [:index, :show]
  end
  namespace :users do
    resources :resources, only: [:edit, :update]
  end
end
