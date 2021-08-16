class Api::V1::GamesController < ApplicationController
  before_action :set_game, only: %i[ show edit update destroy ]

  # GET /games.json
  def index
    @games = Game.all.order(title: :asc)
    render json: @games
  end

  # GET /games/1.json
  def show
    if @game
      render json: @game
    else
      render json: @game.errors
    end
  end

  # GET /games/new
  def new
    @game = Game.new
  end

  # GET /games/1/edit
  def edit
  end

  # POST /games or /games.json
  def create
    @game = Game.new(game_params)
    if @game.save
      render json: @game
    else
      render json: @game.errors
    end
  end

  # PATCH/PUT /games/1 or /games/1.json
  def update
  end

  # DELETE /games/1 or /games/1.json
  def destroy
    @game.destroy

    render json: { notice: 'Game was successfully removed.' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def game_params
      params.require(:game).permit(:title, :style, :quantity)
    end
end
