class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!, except: [:set_tester_mode], unless: :tester_mode?
  around_action :set_current_user

  $tester_mode = false

  def set_tester_mode
    $tester_mode = params[:tester_mode].to_bool
    redirect_to request.referer
  end

  def tester_mode?
    $tester_mode ? (@current_user = User.first) : (@current_user = current_user)
    return $tester_mode
  end

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
