package com.a603.youlangme.repository;

import com.a603.youlangme.entity.log.ChatLog;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChatRepository extends CrudRepository<ChatLog,Long> {

    List<ChatLog>findAll();


}
