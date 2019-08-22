class Users::ResourcesController < ApplicationController
  before_action :set_user, only: [:edit, :update]
  before_action :verify_user, only: [:edit, :update]
  def edit
  end
  def update
    respond_to do |format|
      flash[:notice] = "Atualizado com sucesso." if @user.update(user_params)
      flash[:alert] = @user.errors.full_messages(&:inspect).join('. ') + '.' if @user.errors.any?
      format.html { redirect_to edit_users_resources_path(@user) }
    end
  end
  private
  def set_user
    @user = User.find(params[:id])
  end
  def verify_user
    if @user != current_user
      flash[:alert] = "Você não possuí autorização para continuar."
      redirect_to root_path
    end
  end
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
