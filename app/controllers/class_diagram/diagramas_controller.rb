class ClassDiagram::DiagramasController < ApplicationController
  before_action :set_diagrama, only: [:show, :edit, :update, :destroy]

  def index
    @diagramas = CLDIAG.where(user_id: current_user.id).order(id: :desc)
    @title = 'Lista de Diagramas de Classes'
  end

  def show
    flash[:notice] = "Diagrama gerado com sucesso."
    @title = 'Diagrama de Classes Gerado'
  end

  def new
    @diagrama = CLDIAG.new
    params_for_clmeto
    @title = 'Novo Diagrama de Classes'
  end

  def edit
    @classes = CLCLAS.where(cldiag_id: @diagrama.id)
    params_for_clmeto
    @title = 'Editando Diagrama de Classes'
  end

  def create
    respond_to do |format|
      begin
        @diagrama = CLDIAG.new(diagrama_params)
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
      @diagrama = CLDIAG.find(params[:id])
    end

    def diagrama_params
      @params_for_reload = {}
      params.require(:cldiag).permit(:nome, classo_attributes: [:id, :clclas_origem_id, :clclas_destino_id, :multi_origem, :multi_destino, :tipo_associacao, :estereotipo, :_destroy])
    end

    def params_for_clmeto
      if @items = params[:classo_attributes]
        @items.each do |i|
          @item = CLASSO.new(clclas_origem_id: @items[i]['clclas_origem_id'], clclas_destino_id: @items[i]['clclas_destino_id'], multi_origem: @items[i]['multi_origem'], multi_destino: @items[i]['multi_destino'], tipo_associacao: @items[i]['tipo_associacao'], estereotipo: @items[i]['estereotipo'])
          @diagrama.classo.new(@item.attributes) if @items[i]['id'].blank?
        end
        return true
      end
      return false
    end
end
