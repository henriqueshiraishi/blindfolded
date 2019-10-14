class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  around_action :set_current_user

  def catch(resource)
    resource.errors.full_messages.join(". ") + "."
  end

  def after_sign_in_path_for(resource)
    root_path || stored_location_for(resource)
  end
  protected
  def set_current_user
    Current.user = current_user
    yield
  ensure
    # to address the thread variable leak issues in Puma/Thin webserver
    Current.user = nil
  end
end
