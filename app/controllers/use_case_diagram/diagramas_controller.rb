class UseCaseDiagram::DiagramasController < ApplicationController
  before_action :set_diagrama, only: [:show, :edit, :update, :destroy]

  def index
    @diagramas = CSDIAG.where(user_id: current_user.id).order(id: :desc)
    @title = 'Lista de Diagramas de Caso de Uso'
  end

  def show
    flash[:notice] = "Diagrama gerado com sucesso."
    @title = 'Diagrama de Caso de Uso Gerado'
  end

  def new
    @diagrama = CSDIAG.new
    params_for_csasso
    @title = 'Novo Diagrama de Caso de Uso'
  end

  def edit
    @elementos = CSELEM.where(csdiag_id: @diagrama.id)
    params_for_csasso
    @title = 'Editando Diagrama de Caso de Uso'
  end

  def create
    respond_to do |format|
      begin
        @diagrama = CSDIAG.new(diagrama_params)
        if @diagrama.save
          flash[:notice] = 'Diagrama criado com sucesso.'
          format.html { redirect_to edit_use_case_diagram_diagramas_path(@diagrama) }
        end
        if @diagrama.errors.any?
          flash[:alert] = catch(@diagrama)
          @params_for_reload = diagrama_params
        end
      rescue StandardError => e
        flash[:error] = e.message
        @params_for_reload = diagrama_params
      end
      format.html { redirect_to new_use_case_diagram_diagramas_path(params: @params_for_reload) }
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
      format.html { redirect_to edit_use_case_diagram_diagramas_path(@diagrama, params: @params_for_reload) }
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
      format.html { redirect_to use_case_diagram_diagramas_index_path }
    end
  end

  private
    def set_diagrama
      @diagrama = CSDIAG.find(params[:id])
    end

    def diagrama_params
      @params_for_reload = {}
      params.require(:csdiag).permit(:nome, csasso_attributes: [:id, :cselem_origem_id, :cselem_destino_id, :tipo_associacao, :estereotipo, :_destroy])
    end

    def params_for_csasso
      if @items = params[:csasso_attributes]
        @items.each do |i|
          @item = CSASSO.new(cselem_origem_id: @items[i]['cselem_origem_id'], cselem_destino_id: @items[i]['cselem_destino_id'], tipo_associacao: @items[i]['tipo_associacao'], estereotipo: @items[i]['estereotipo'])
          @diagrama.csasso.new(@item.attributes) if @items[i]['id'].blank?
        end
        return true
      end
      return false
    end
end
