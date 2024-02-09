class Api::V1::TimeEntriesController < ApplicationController
  def index
    uri = URI("https://api.harvestapp.com/v2/time_entries")

    outgoing_params = {}
    if params["start_date"].present? && params["end_date"].present?
      outgoing_params["from"] = params["start_date"]
      outgoing_params["to"] = params["end_date"]
    end
    outgoing_params["user_id"] = params["user_id"] if params["user_id"].present? && params["user_id"] != "null"
    uri.query = URI.encode_www_form( outgoing_params )

    Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
      request = Net::HTTP::Get.new uri
      request["User-Agent"] = "Ruby Harvest API Sample"
      request["Authorization"] = "Bearer #{ENV["HARVEST_ACCESS_TOKEN"]}"
      request["Harvest-Account-ID"] = ENV["HARVEST_ACCOUNT_ID"]

      response = http.request request
      json_response = JSON.parse(response.body)["time_entries"].map{|t|
        {
          "user_name": t.dig('user', 'name'),
          "client_name": t.dig('client', 'name'),
          "project_name": t.dig('project', 'name'),
          "task": t.dig('task', 'name'),
          "notes": t['notes'],
          "time_date": t['spent_date'],
          "time_hours": t['hours']
        }
      }

      render json: json_response
    end
  end
end
