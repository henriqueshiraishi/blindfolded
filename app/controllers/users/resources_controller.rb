class Users::ResourcesController < ApplicationController
  before_action :set_user, only: [:edit, :update]

  def edit
    @title = 'Meu Perfil'
  end

  def update
    respond_to do |format|
      flash[:notice] = "Atualizado com sucesso." if @user.update(user_params)
      flash[:alert] = @user.errors.full_messages(&:inspect).join('. ') + '.' if @user.errors.any?
      format.html { redirect_to edit_users_resources_path }
    end
  end

  private
  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
