require 'rubygems'
require 'bundler/setup'

require 'sinatra'
require 'oauth'
require 'twitter'
require 'json'

require 'byebug'

CONSUMER_KEY="ajU7yvzKSTznmCwGR4CuXDE64"
CONSUMER_SECRET="CI2XOiZsLZXKicbWZW9EGCyda4GgEJbY3v2VnmONtfxsWqeOyb"
ACCESS_TOKEN="86284904-M20SsnQ3Nkq8PxnhsKWz3PJYyeBZudyIlt8vhc1s9"
ACCESS_TOKEN_SECRET="aqqUus01UdFJzMCFyIfAihpgME1ErvgV5ntkHvOwpEJS2"

enable :sessions

get '/' do
  erb :page
end

get '/authenticate' do
  Twitter.configure do |config|
    config.consumer_key = CONSUMER_KEY
    config.consumer_secret = CONSUMER_SECRET
    config.oauth_token = ACCESS_TOKEN
    config.oauth_token_secret = ACCESS_TOKEN_SECRET
  end
end

get '/tweets/:user_id' do
  content_type :json
  client = Twitter::Client.new
  response = client.user_timeline(params[:user_id], {count: 30})
  response.map!(&:attrs)
  # response.map!{|tweet| {id: tweet.id, created_at: tweet.created_at, text: tweet.text, 
  #   source: tweet.source, user: {id: tweet.user.id, name: tweet.user.name}} }
  response = response.to_json
end

# The following methods aren't used
# ====================================================================================================

TWITTER_URL = "https://api.twitter.com/1.1"
CALLBACK_URL="http://localhost:4567/oauth/callback"

# get '/authenticate' do
#     consumer = OAuth::Consumer.new CONSUMER_KEY, CONSUMER_SECRET, :site => 'https://api.twitter.com'
#     token_hash = { :oauth_token => ACCESS_TOKEN, :oauth_token_secret => ACCESS_TOKEN_SECRET }
#     session[:access_token] = OAuth::AccessToken.from_hash(consumer, token_hash)
# end

# get '/tweets/:user_id' do
#   content_type :json
#   response = session[:access_token].get(TWITTER_URL+"/statuses/user_timeline.json?user_id="+params[:user_id]+"&count=30")
#   response.body
# end

get '/oauth/request_token' do
  consumer = OAuth::Consumer.new CONSUMER_KEY, CONSUMER_SECRET, :site => 'https://api.twitter.com'

  request_token = consumer.get_request_token :oauth_callback => CALLBACK_URL
  session[:request_token] = request_token.token
  session[:request_token_secret] = request_token.secret

  # HTTParty.get(request_token.authorize_url, :verify => false).parsed_response
  request_token.authorize_url
end

get '/oauth/callback' do
  consumer = OAuth::Consumer.new CONSUMER_KEY, CONSUMER_SECRET, :site => 'https://api.twitter.com'

  puts "CALLBACK: request: #{session[:request_token]}, #{session[:request_token_secret]}"

  request_token = OAuth::RequestToken.new consumer, session[:request_token], session[:request_token_secret]
  access_token = request_token.get_access_token :oauth_verifier => params[:oauth_verifier]

  Twitter.configure do |config|
    config.consumer_key = CONSUMER_KEY
    config.consumer_secret = CONSUMER_SECRET
    config.oauth_token = access_token.token
    config.oauth_token_secret = access_token.secret
  end

  "[#{Twitter.user.screen_name}] access_token: #{access_token.token}, secret: #{access_token.secret}"
end
