Rails.application.routes.draw do
  resources :races
  get 'up' => 'rails/health#show', as: :rails_health_check

  mount Rswag::Api::Engine => '/'
  mount Rswag::Ui::Engine => '/'
end
