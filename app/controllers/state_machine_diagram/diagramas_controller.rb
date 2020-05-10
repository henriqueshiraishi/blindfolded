class StateMachineDiagram::DiagramasController < ApplicationController
  before_action :set_diagrama, only: [:show, :edit, :update, :destroy]

  def index
    @diagramas = MQDIAG.where(user_id: current_user.id).order(id: :desc)
    @title = 'Lista de Diagramas de Máquina de Estado'
  end

  def show
    flash[:notice] = "Diagrama gerado com sucesso."
    @title = 'Diagrama de Máquina de Estado Gerado'
  end

  def new
    @diagrama = MQDIAG.new
    params_for_mqtran
    @title = 'Novo Diagrama de Máquina de Estado'
  end

  def edit
    @elementos = MQELEM.where(mqdiag_id: @diagrama.id)
    params_for_mqtran
    @title = 'Editando Diagrama de Máquina de Estado'
  end

  def create
    respond_to do |format|
      begin
        @diagrama = MQDIAG.new(diagrama_params)
        if @diagrama.save
          flash[:notice] = 'Diagrama criado com sucesso.'
          format.html { redirect_to edit_state_machine_diagram_diagramas_path(@diagrama) }
        end
        if @diagrama.errors.any?
          flash[:alert] = catch(@diagrama)
          @params_for_reload = diagrama_params
        end
      rescue StandardError => e
        flash[:error] = e.message
        @params_for_reload = diagrama_params
      end
      format.html { redirect_to new_state_machine_diagram_diagramas_path(params: @params_for_reload) }
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
      format.html { redirect_to edit_state_machine_diagram_diagramas_path(@diagrama, params: @params_for_reload) }
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
      format.html { redirect_to state_machine_diagram_diagramas_index_path }
    end
  end

  private
    def set_diagrama
      @diagrama = MQDIAG.find(params[:id])
    end

    def diagrama_params
      @params_for_reload = {}
      params.require(:mqdiag).permit(:nome, :mqelem_inicial_id, :mqelem_final_id, mqtran_attributes: [:id, :mqelem_origem_id, :mqelem_destino_id, :descricao, :estereotipo, :_destroy])
    end

    def params_for_mqtran
      if @items = params[:mqtran_attributes]
        @items.each do |i|
          @item = MQTRAN.new(mqelem_origem_id: @items[i]['mqelem_origem_id'], mqelem_destino_id: @items[i]['mqelem_destino_id'], descricao: @items[i]['descricao'])
          @diagrama.mqtran.new(@item.attributes) if @items[i]['id'].blank?
        end
        return true
      end
      return false
    end
end
