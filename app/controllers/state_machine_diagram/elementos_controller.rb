class StateMachineDiagram::ElementosController < ApplicationController
  before_action :set_elemento, only: [:edit, :update, :destroy]
  before_action :set_diagrama, only: [:new, :edit]

  def new
    @elemento = MQELEM.new
    @title = 'Novo Elemento'
  end

  def edit
    @title = 'Editando Elemento'
  end

  def create
    respond_to do |format|
      begin
        @elemento = MQELEM.new(elemento_params)
        if @elemento.save
          flash[:notice] = 'Elemento criada com sucesso.'
          format.html { redirect_to edit_state_machine_diagram_elementos_path(@elemento, mqdiag_id: params[:mqelem][:mqdiag_id]) }
        end
        if @elemento.errors.any?
          flash[:alert] = catch(@elemento)
          @params_for_reload = elemento_params
        end
      rescue StandardError => e
        flash[:error] = e.message
        @params_for_reload = elemento_params
      end
      format.html { redirect_to new_state_machine_diagram_elementos_path(params: @params_for_reload) }
    end
  end

  def update
    respond_to do |format|
      begin
        flash[:notice] = 'Elemento atualizada com sucesso.' if @elemento.update(elemento_params)
        if @elemento.errors.any?
          flash[:alert] = catch(@elemento)
          @params_for_reload = elemento_params
        end
      rescue StandardError => e
        flash[:error] = e.message
        @params_for_reload = elemento_params
      end
      format.html { redirect_to edit_state_machine_diagram_elementos_path(@elemento, params: @params_for_reload, mqdiag_id: params[:mqelem][:mqdiag_id]) }
    end
  end

  def destroy
    respond_to do |format|
      begin
        flash[:notice] = 'Elemento removida com sucesso.' if @elemento.destroy
        flash[:alert] = catch(@elemento) if @elemento.errors.any?
      rescue StandardError => e
        flash[:error] = e.message
      end
      format.html { redirect_to edit_state_machine_diagram_diagramas_path(@elemento.mqdiag_id) }
    end
  end

  private
    def set_elemento
      @elemento = MQELEM.find(params[:id])
    end

    def set_diagrama
      @diagrama = MQDIAG.find(params[:mqdiag_id])
    end

    def elemento_params
      @params_for_reload = {}
      params.require(:mqelem).permit(:mqdiag_id, :descricao, :estereotipo)
    end
end
