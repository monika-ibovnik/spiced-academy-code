jQuery(function fn($){
    //insert into template
    Handlebars.templates = Handlebars.templates || {};
    var templates = document.querySelectorAll('script[type="text/x-handlebars-template"]');
    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    Handlebars.partials = Handlebars.templates;

    var username = '';
    var password = '';
    var repOwner = '';
    var request = '';
    var repoResponse;
    $('#loginForm').submit(function(e){
        e.preventDefault();
        var formFields = $('form').find('input');
        formFields.each(function(){
            var element = $(this);
            if(element.attr('name')=='user'){
                username = element.val();
            }else if(element.attr('name')=='pass'){
                password = element.val();
            }else if(element.attr('name')=='repository-owner'){
                repOwner = element.val();
            }
        });
        request = $.ajax({
            url: 'https://api.github.com/users/' + repOwner + '/repos',
            headers: {
                Authorization: 'Basic ' + btoa(username + ':' + password),
            },
            success: function(data){
                repoResponse = data.map(function(value){
                    return {
                        repoName: value.name,
                        repoDescription: value.description,
                        repoCommits: value.git_commits_url,
                        repoLanguage: value.language,
                        owner: {
                            avatar: value.owner.avatar_url,
                            profile: value.owner.html_url,
                            login: value.owner.login
                        }
                    };
                });
                $('#results').html(Handlebars.templates.reposList({repo : repoResponse}));
            }
        });
    });//on submit

    $(document).on('click', function(e){
        if($(e.target).hasClass('requestCommits')){
            var name = $(e.target).html();
            if(request){
                request = '';
            }
            request = $.ajax({
                url: 'https://api.github.com/repos/' + repOwner + '/' + name + '/commits',
                headers: {
                    Authorization: 'Basic ' + btoa(username + ':' + password),
                },
                success: function(commits){
                    var commits = commits.slice(0,10).map(function(currentCommit){
                        return {
                            committerName : currentCommit.commit.committer.name,
                            message: currentCommit.commit.message,
                            sha : currentCommit.sha.slice(0,8)
                        };
                    });
                    console.log(commits);
                }
            });
        }
    });

});
