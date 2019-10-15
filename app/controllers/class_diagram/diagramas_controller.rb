class ClassDiagram::DiagramasController < ApplicationController
  before_action :set_diagrama, only: [:show, :edit, :update, :destroy]

  def index
    @diagramas = Diagrama.where(user_id: current_user.id).order(id: :desc)
  end

  def show
    # Método que irá gerar o diagrama no Canvas
  end

  def new
    @diagrama = Diagrama.new
  end

  def edit
    @classes = Classe.where(diagrama_id: @diagrama.id)
  end

  def create
    respond_to do |format|
      begin
        @diagrama = Diagrama.new(diagrama_params)
        if @diagrama.save
          flash[:notice] = 'Diagrama criado com sucesso.'
          format.html { redirect_to edit_class_diagram_diagramas_path(@diagrama) }
        end
        if @diagrama.errors.any?
          flash[:alert] = catch(@diagrama)
          @params_for_reload = diagrama_params
        end
      rescue StandardError => e
        flash[:error] = e.message
        @params_for_reload = diagrama_params
      end
      format.html { redirect_to new_class_diagram_diagramas_path(params: @params_for_reload) }
    end
  end

  def update
    respond_to do |format|
      begin
        flash[:notice] = 'Diagrama atualizado com sucesso.' if @diagrama.update(diagrama_params)
        if @diagrama.errors.any?
          flash[:alert] = catch(@diagrama)
          @params_for_reload = diagrama_params
        end
      rescue StandardError => e
        flash[:error] = e.message
        @params_for_reload = diagrama_params
      end
      format.html { redirect_to edit_class_diagram_diagramas_path(@diagrama, params: @params_for_reload) }
    end
  end

  def destroy
    respond_to do |format|
      begin
        flash[:notice] = 'Diagrama removido com sucesso.' if @diagrama.destroy
        flash[:alert] = catch(@diagrama) if @diagrama.errors.any?
      rescue StandardError => e
        flash[:error] = e.message
      end
      format.html { redirect_to class_diagram_diagramas_index_path }
    end
  end

  private
    def set_diagrama
      @diagrama = Diagrama.find(params[:id])
    end

    def diagrama_params
      @params_for_reload = {}
      params.require(:diagrama).permit(:nome)
    end
end
