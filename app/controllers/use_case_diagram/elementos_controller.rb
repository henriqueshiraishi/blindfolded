class UseCaseDiagram::ElementosController < ApplicationController
  before_action :set_elemento, only: [:edit, :update, :destroy]
  before_action :set_diagrama, only: [:new, :edit]

  def new
    @elemento = CSELEM.new
    @title = 'Novo Elemento'
  end

  def edit
    @title = 'Editando Elemento'
  end

  def create
    respond_to do |format|
      begin
        @elemento = CSELEM.new(elemento_params)
        if @elemento.save
          flash[:notice] = 'Elemento criada com sucesso.'
          format.html { redirect_to edit_use_case_diagram_elementos_path(@elemento, csdiag_id: params[:cselem][:csdiag_id]) }
        end
        if @elemento.errors.any?
          flash[:alert] = catch(@elemento)
          @params_for_reload = elemento_params
        end
      rescue StandardError => e
        flash[:error] = e.message
        @params_for_reload = elemento_params
      end
      format.html { redirect_to new_use_case_diagram_elementos_path(params: @params_for_reload) }
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
      format.html { redirect_to edit_use_case_diagram_elementos_path(@elemento, params: @params_for_reload, csdiag_id: params[:cselem][:csdiag_id]) }
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
      format.html { redirect_to edit_use_case_diagram_diagramas_path(@elemento.csdiag_id) }
    end
  end

  private
    def set_elemento
      @elemento = CSELEM.find(params[:id])
    end

    def set_diagrama
      @diagrama = CSDIAG.find(params[:csdiag_id])
    end

    def elemento_params
      @params_for_reload = {}
      params.require(:cselem).permit(:csdiag_id, :descricao, :estereotipo, :tipo_elemento)
    end
end
